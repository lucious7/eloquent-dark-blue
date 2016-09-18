function Actor(){
    var actorTypes = {
        "@": Player,
        "o": Coin,
        "=": HMovingLava,
        "|": VMovingLava,
        "v": DrippingLava
    };
}

Actor.prototype.fromChar = function(ch) {
    return actorTypes[ch];
}