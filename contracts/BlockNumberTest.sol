pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract BlockNumberTest {

    struct State {
        uint256 index;
        uint256 blockNumber;
        uint256 blockTime;
    }

    mapping(address => State) public userState;


    function initialize() public {

        address user = msg.sender;

        userState[user] = State({
        index : 0,
        blockNumber : block.number,
        blockTime : block.timestamp
        });

    }

    function getUserState() public view returns (State memory){
        return userState[msg.sender];
    }

    function updateUserState() public {
        State storage state = userState[msg.sender];

        state.index = state.index + 1;
        state.blockNumber = block.number;
        state.blockTime = block.timestamp;
    }

    function compareAndUpdateUserState() public {

        State storage state = userState[msg.sender];
        uint256 blockNumber = block.number;

        updateUserState();
        require(state.blockNumber <= blockNumber, "state.blockNumber must be smaller or equal to blockNumber");
    }


    function getBlockNumber() public view returns (uint256){
        return block.number;
    }


}
