import { readFileSync } from "fs";
import path from "path";

export function getAppVersion(): string {
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    const pkg = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    return pkg.version || "0.0.0";
}
