    function Timer() {
        this.date = new Date();
        this.cooldown = function () {
            var currentDate = new Date();
            return currentDate - this.date;
        }
    }