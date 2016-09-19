function Actor(){

}

Actor.fromChar = function(ch) {
    var actorTypes = {
        "@": Player,
        "o": Coin,
        "=": HMovingLava,
        "|": VMovingLava,
        "v": DrippingLava
    };
    
    return actorTypes[ch];
}