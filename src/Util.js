const Util = {
    getRandomColorAccordingToId: function (id) {
        let colors = ['#9F69E7', '#3F0F3F', '#E51670', '#D40E0D', '#EBB424', '#49C39E', '#80D2DE'];
        let number = parseInt(id, 36) % colors.length;
        return colors[number];
    }
};

export default Util;