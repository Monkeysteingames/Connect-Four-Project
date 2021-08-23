describe("Board Creation(with setup and tear-down)", function () {

    beforeEach(function () {
        const WIDTH = 7;
        const HEIGHT = 6;
        const board = [];
    })

    it("should have a length equal to the value set for height", function () {
        expect(board.length).toEqual(6);
    });

    it('should have a sub array length equal to the values set for width', function () {
        expect(board[0].length).toEqual(7);
    });
})
