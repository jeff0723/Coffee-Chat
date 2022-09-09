import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, upgrades, network } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { save, get, execute } = hre.deployments;
    const chainId = await hre.getChainId();
    const { deployer } = await hre.getNamedAccounts();
    console.log("network:", network.name, `(${chainId})`);
    const chatDeployment = await get("CoffeeChat");
    const chatAddress = chatDeployment.address;

    const CoffeeNFT = await ethers.getContractFactory("CoffeeNFT");

    // deploy
    const proxy = await upgrades.deployProxy(
        CoffeeNFT,
        [chatAddress],
        { kind: 'uups' }
    );
    await proxy.deployed();
    console.log("CoffeeNFT Proxy:", proxy.address);
    const logicAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("CoffeeNFT Logic:", logicAddress);

    // save proxy artifact
    const proxyArtifact = await hre.deployments.getArtifact('CoffeeNFT');
    const proxyDeployments = {
        address: proxy.address,
        ...proxyArtifact
    };
    await save('CoffeeNFT', proxyDeployments);

    // save logic artifact for verification
    const logicArtifact = await hre.deployments.getExtendedArtifact('CoffeeNFT');
    const logicDeployments = {
        address: logicAddress,
        ...logicArtifact
    };
    await save('CoffeeNFTLogic', logicDeployments);

    await execute("CoffeeChat", { from: deployer }, "setCoffeeNFT", proxy.address);
};
export default func;
func.tags = ["deployNFT", "deploy"];