import { IDType, Metadata, SeriesRowsMap, RequiredSeriesRowsParams } from "@/interface";

export default class Collection {
    #rowHeight: number;

    #initLocations: number[];

    #locations: number[] = [];

    #metadataMap = new Map<IDType, Metadata>([]);

    #seriesRowsMap: SeriesRowsMap = {};

    constructor(columns: number, rowHeight: number) {
        this.#rowHeight = rowHeight;
        this.#initLocations = Array.from<number>({ length: columns }).fill(0);
    }

    public getCurrentLocation(): [number, number] {
        if (this.#locations.length === 0) {
            this.#locations = [...this.#initLocations];
        }
        const hitTop = Math.min(...this.#locations);
        const hitIndex = this.#locations.indexOf(hitTop);
        return [hitTop, hitIndex];
    }

    public updateCurrentLocation(index: number, top: number): void {
        this.#locations[index] = top;
    }

    public getMetadataMap(key: IDType): Metadata {
        return this.#metadataMap.get(key);
    }

    public getSeriesRows({ top, height }: RequiredSeriesRowsParams): string[] {
        const start = Math.floor(top / this.#rowHeight);
        const stop = Math.ceil((top + height) / this.#rowHeight);
        const seriesRows = [];
        for (let i = start; i < stop; i += 1) {
            const key = `${i}-${i + 1}`;
            const existed = !!this.#seriesRowsMap[key];
            if (!existed) {
                this.#seriesRowsMap[key] = [];
            }
            seriesRows.push(key);
        }
        return seriesRows;
    }

    public registerOverlapCell(id: IDType, params: RequiredSeriesRowsParams): void {
        const seriesRows = this.getSeriesRows(params);
        seriesRows.forEach((key: string) => {
            this.#seriesRowsMap[key].push(id);
        });
    }

    public registerMetadataMap(key: IDType, info: Metadata): void {
        this.#metadataMap.set(key, info);
    }

    public getIdsByRowKey(key: string): IDType[] {
        return this.#seriesRowsMap[key] || [];
    }

    public clearCollecttion(): void {
        this.#locations = [];
        this.#metadataMap.clear();
        this.#seriesRowsMap = {};
    }
}
