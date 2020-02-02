global['window'] = global;
global['document'] = {
    head: {
        createShadowRoot: {}
    }
};

import OlFeature from 'ol/Feature';
import { Point } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';

export class MapFeature {

    private feature: OlFeature; 

    constructor() {
        this.feature = new OlFeature({
            geometry: new Point([0, 0]),
        });
    }

    move(deltaX: number, deltaY: number) {
        this.feature.getGeometry().translate(deltaX, deltaY);
    }

    getCoordinates(): Array<Coordinate> {
        const point = this.feature.getGeometry() as Point;

        return [point.getCoordinates()];
    }

}
export default window;

const feature = new MapFeature();

feature.move(10, 10);
console.log('coordinates: ', feature.getCoordinates());
console.log('wtf');
