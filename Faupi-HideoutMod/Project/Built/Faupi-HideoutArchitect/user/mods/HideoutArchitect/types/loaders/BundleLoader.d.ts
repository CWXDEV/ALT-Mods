import { HttpServerHelper } from "../helpers/HttpServerHelper";
import { JsonUtil } from "../utils/JsonUtil";
import { VFS } from "../utils/VFS";
declare class BundleInfo {
    private httpServerHelper;
    key: string;
    path: string;
    filepath: string;
    dependencyKeys: string[];
    constructor(modpath: string, bundle: any, httpServerHelper: HttpServerHelper);
}
export declare class BundleLoader {
    private httpServerHelper;
    private vfs;
    private jsonUtil;
    private bundles;
    constructor(httpServerHelper: HttpServerHelper, vfs: VFS, jsonUtil: JsonUtil);
    getBundles(local: boolean): BundleInfo[];
    getBundle(key: string, local: boolean): BundleInfo;
    addBundles(modpath: string): void;
}
export {};
