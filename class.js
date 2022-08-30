class SuperArray {
    constructor(n, m, options) {
        this.array = this.createArray(n, m, options);
        this.tempMarkerData = null;
        this.height = n;
        this.width = m;
    }

    createArray(n, m, options) {
        let arr = new Array(n);
        for (let row = 0; row < arr.length; row++) {
            arr[row] = new Array(m);
            for (let col = 0; col < arr[row].length; col++) {
                let min = Math.ceil(options.min);
                let max = Math.floor(options.max);
                arr[row][col] = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        return arr;
    }

    render(separator) {
        for (let row = 0; row < this.array.length; row++) {
            for (let col = 0; col < this.array[row].length; col++) {
                document.write(this.array[row][col] + "&nbsp;&nbsp;")
            }
            document.write("</br>");
        }
        document.write(separator);
    }

    clear(direction, k) {
        for (let row = 0; row < this.array.length; row++) {
            for (let col = 0; col < this.array[row].length; col++) {
                if (direction === 'row') {
                    if (k === row + 1) {
                        if (this.tempMarkerData && row == this.tempMarkerData.x && col == this.array[row].length - 1) {
                            this.tempMarkerData = null;
                        }
                        this.array[row][col] = 0
                    }
                }
                if (direction === 'column') {
                    if (k === col + 1) {
                        if (this.tempMarkerData && col == this.tempMarkerData.y && row == this.array.length - 1) {
                            this.tempMarkerData = null;
                        }
                        this.array[row][col] = 0
                    }
                }
            }
        }
    }

    setMarkerOnPosition(coords) {
        const { x, y } = coords;
        this.tempMarkerData = {
            x: x,
            y: y,
            markerValue: this.array[y][x]
        };
        this.array[y][x] = "&";
    }

    checkPosition(obj) {
        return Boolean(obj.x >= 0 && obj.x <= this.width - 1 && obj.y >= 0 && obj.y <= this.height - 1);
    }

    setMarker(obj) {
        if (this.tempMarkerData == null) {
            const { x, y } = obj;
            if (this.checkPosition({ x: obj.x - 1, y: obj.y - 1 })) {
                this.setMarkerOnPosition({ x: x - 1, y: y - 1 });
            }
        }
    }

    goTo(obj) {
        if (this.tempMarkerData) {
            const { x, y } = obj;
            if (this.checkPosition({ x: obj.x - 1, y: obj.y - 1 })) {
                this.array[this.tempMarkerData.y][this.tempMarkerData.x] = this.tempMarkerData.markerValue;
                this.setMarkerOnPosition({ x: x - 1, y: y - 1 });
            }
        }
    }

    shift(direction) {
        if (this.tempMarkerData) {
            const { x, y, markerValue } = this.tempMarkerData;
            if (direction == 'left') {
                if (this.checkPosition({ x: x - 1, y: y })) {
                    this.array[y][x] = markerValue;
                    this.setMarkerOnPosition({ x: x - 1, y: y });
                }
            }
            if (direction == 'right') {
                if (this.checkPosition({ x: x + 1, y: y })) {
                    this.array[y][x] = markerValue;
                    this.setMarkerOnPosition({ x: x + 1, y: y });
                }
            }
            if (direction == 'top') {
                if (this.checkPosition({ x: x, y: y - 1 })) {
                    this.array[y][x] = markerValue;
                    this.setMarkerOnPosition({ x: x, y: y - 1 });
                }
            }
            if (direction == 'bottom') {
                if (this.checkPosition({ x: x, y: y + 1 })) {
                    this.array[y][x] = markerValue;
                    this.setMarkerOnPosition({ x: x, y: y + 1 });
                }
            }
        }
    }
}

const someNewArray = new SuperArray(5, 3, { min: 9, max: 54 });
someNewArray.render('</br>');
someNewArray.clear('column', 3);
someNewArray.render('</br>');
someNewArray.setMarker({ x: 1, y: 4 })
someNewArray.render('</br>');
someNewArray.goTo({ x: 2, y: 3 });
someNewArray.render('</br>');
someNewArray.shift('left');
someNewArray.render('</br>');
someNewArray.shift('right');
someNewArray.render('</br>');
someNewArray.shift('top');
someNewArray.render('</br>');
someNewArray.shift('bottom');
someNewArray.render('</br>');