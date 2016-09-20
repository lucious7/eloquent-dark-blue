var Type = {
    fromChar: function(ch) {
        var actorTypes = {
            "@": Player,
            "o": Coin,
            "=": HMovingLava,
            "|": VMovingLava,
            "v": DrippingLava
        };
    
        return actorTypes[ch];
    },
    PLAYER: "player",
    COIN: "coin",
    LAVA: "lava",
    WALL: "wall"
};