global['window'] = global;
global['document'] = {
    head: {
        createShadowRoot: {}
    }
};

import { fromLonLat } from 'ol/proj';
import PointerInteraction from 'ol/interaction/Pointer';
import { MapBrowserPointerEvent } from 'ol';
import OlMap from 'ol/map';
import OlFeature from 'ol/Feature';
// import { Map as OlMap, Feature as OlFeature } from 'ol'; // this will make webpack fail
import { Point } from 'ol/geom';
import { Coordinate } from 'ol/coordinate';
import { Options as PointerInteractionOptions } from 'ol/interaction/Pointer';

export class MapFeature {

    private feature: OlFeature; 
    private _pointerInteraction: PointerInteraction;
    private _mouseDown = false;
    private olMap: OlMap;
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

    addMap(olMap?: OlMap): void {
        console.log('olmap added: ', olMap);
        this.olMap = olMap;
    }

    addInteraction(): void {
        this._pointerInteraction = new PointerInteraction(
            <PointerInteractionOptions>{
                handleDownEvent: this.handleDownEvent.bind(this),
                handleUpEvent: this.handleUpEvent.bind(this),
                handleMoveEvent: this.handleMoveEvent.bind(this)
            }
        );
        this.olMap.addInteraction(this._pointerInteraction);
    }
    private handleUpEvent(evt: MapBrowserPointerEvent): boolean {
        this._mouseDown = false;

        return true;
    }

    private handleDownEvent(evt: MapBrowserPointerEvent): boolean {
        this._mouseDown = true;


        return false;
    }

    private handleMoveEvent(mapBrowserEvent: MapBrowserPointerEvent): void {
        console.log('mapBrowserEvent: mapBrowserEvent', mapBrowserEvent);
    }
}
export default window;

const feature = new MapFeature();

console.log('fromLonLat:' , JSON.stringify(fromLonLat([10,10]), undefined, 2))
feature.move(10, 10);
console.log('coordinates: ', feature.getCoordinates());
feature.addMap(undefined);
// feature.addInteraction();