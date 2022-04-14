declare module "*.scss" {
    const resource: { [key: string]: string };
    export = resource;
}

declare module "*.gif" {
    const path: string;
    export default path;
}
