import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, upgrades, network } from "hardhat";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { save } = hre.deployments;
    const chainId = await hre.getChainId();
    console.log("network:", network.name, `(${chainId})`);

    const CoffeeChat = await ethers.getContractFactory("CoffeeChat");

    // deploy
    const proxy = await upgrades.deployProxy(
        CoffeeChat,
        [],
        { kind: 'uups' }
    );
    await proxy.deployed();
    console.log("CoffeeChat Proxy:", proxy.address);
    const logicAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("CoffeeChat Logic:", logicAddress);

    // save proxy artifact
    const proxyArtifact = await hre.deployments.getArtifact('CoffeeChat');
    const proxyDeployments = {
        address: proxy.address,
        ...proxyArtifact
    };
    await save('CoffeeChat', proxyDeployments);

    // save logic artifact for verification
    const logicArtifact = await hre.deployments.getExtendedArtifact('CoffeeChat');
    const logicDeployments = {
        address: logicAddress,
        ...logicArtifact
    };
    await save('CoffeeChat', logicDeployments);
};
export default func;
func.tags = ["deployCoffeeChat", "deploy"];