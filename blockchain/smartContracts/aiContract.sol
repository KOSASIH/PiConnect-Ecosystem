// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIContract {
    struct Model {
        string name;
        string description;
        address owner;
        string modelURI; // URI to the model's metadata or location
        bool isActive;
    }

    mapping(uint256 => Model) public models; // Mapping of model ID to Model
    mapping(address => uint256[]) public userModels; // Mapping of user address to their model IDs
    uint256 public modelCount; // Counter for the number of models

    event ModelCreated(uint256 indexed modelId, string name, address indexed owner);
    event ModelUpdated(uint256 indexed modelId, string name, bool isActive);
    event ModelDeleted(uint256 indexed modelId);

    modifier onlyOwner(uint256 modelId) {
        require(msg.sender == models[modelId].owner, "Not the model owner");
        _;
    }

    // Function to create a new AI model
    function createModel(string memory name, string memory description, string memory modelURI) public {
        modelCount++;
        models[modelCount] = Model(name, description, msg.sender, modelURI, true);
        userModels[msg.sender].push(modelCount);
        emit ModelCreated(modelCount, name, msg.sender);
    }

    // Function to update an existing AI model
    function updateModel(uint256 modelId, string memory name, string memory description, bool isActive) public onlyOwner(modelId) {
        Model storage model = models[modelId];
        model.name = name;
        model.description = description;
        model.isActive = isActive;
        emit ModelUpdated(modelId, name, isActive);
    }

    // Function to delete an AI model
    function deleteModel(uint256 modelId) public onlyOwner(modelId) {
        delete models[modelId];
        emit ModelDeleted(modelId);
    }

    // Function to get model details
    function getModel(uint256 modelId) public view returns (string memory name, string memory description, address owner, string memory modelURI, bool isActive) {
        Model memory model = models[modelId];
        return (model.name, model.description, model.owner, model.modelURI, model.isActive);
    }

    // Function to get models created by a user
    function getUser Models(address user) public view returns (uint256[] memory) {
        return userModels[user];
    }
}
