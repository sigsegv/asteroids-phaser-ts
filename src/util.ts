export class Util {
    public static facing(rotation:number):[number, number] {
        return [Math.sin(rotation), -Math.cos(rotation)];
    }
}