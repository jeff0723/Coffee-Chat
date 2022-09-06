import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, upgrades, network } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { save, get, execute } = hre.deployments;
    const chainId = await hre.getChainId();
    const { deployer } = await hre.getNamedAccounts();
    console.log("network:", network.name, `(${chainId})`);
    const CoffeeNFT = await ethers.getContractFactory("CoffeeNFT");

    // get proxy address
    const proxy = await get("CoffeeNFT");
    console.log("CoffeeNFT proxy:", proxy.address);
    const logicAddress = await upgrades.erc1967.getImplementationAddress(proxy.address);
    console.log("CoffeeNFT logic:", logicAddress);

    // upgrade
    console.log("upgrading...");
    const newProxy = await upgrades.upgradeProxy(proxy.address, CoffeeNFT);
    console.log("CoffeeNFT proxy:", newProxy.address);
    await newProxy.deployed();
    const newLogicAddress = await upgrades.erc1967.getImplementationAddress(newProxy.address);
    console.log("CoffeeNFT logic:", newLogicAddress);
    if (proxy.address === newProxy.address) {
        console.log("success!");
    }
    else {
        console.log("error!");
        return;
    }

    // save proxy artifact
    const proxyArtifact = await hre.deployments.getArtifact('CoffeeNFT');
    const proxyDeployments = {
        address: newProxy.address,
        ...proxyArtifact
    };
    await save('CoffeeNFT', proxyDeployments);

    // save logic artifact for verification
    const logicArtifact = await hre.deployments.getExtendedArtifact('CoffeeNFT');
    const logicDeployments = {
        address: newLogicAddress,
        ...logicArtifact
    };
    await save('CoffeeNFTLogic', logicDeployments);
};
export default func;
func.tags = ["upgradeCoffeeNFT", "upgrade"];
