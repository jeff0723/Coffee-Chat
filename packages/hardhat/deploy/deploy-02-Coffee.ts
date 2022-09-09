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

    const Coffee = await ethers.getContractFactory("Coffee");

    // deploy
    const proxy = await upgrades.deployProxy(
        Coffee,
        [chatAddress],
        { kind: 'uups' }
    );
    await proxy.deployed();
    console.log("Coffee Proxy:", proxy.address);
    const logicAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("Coffee Logic:", logicAddress);

    // save proxy artifact
    const proxyArtifact = await hre.deployments.getArtifact('Coffee');
    const proxyDeployments = {
        address: proxy.address,
        ...proxyArtifact
    };
    await save('Coffee', proxyDeployments);

    // save logic artifact for verification
    const logicArtifact = await hre.deployments.getExtendedArtifact('Coffee');
    const logicDeployments = {
        address: logicAddress,
        ...logicArtifact
    };
    await save('CoffeeLogic', logicDeployments);

    await execute("CoffeeChat", { from: deployer }, "setCoffee", proxy.address);
};
export default func;
func.tags = ["deployToken", "deploy"];