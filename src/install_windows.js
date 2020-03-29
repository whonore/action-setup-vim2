"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const core = __importStar(require("@actions/core"));
const vim_1 = require("./vim");
const neovim_1 = require("./neovim");
async function installVimNightly() {
    core.debug('Installing nightly Vim on Windows');
    const vimDir = await vim_1.installNightlyVimOnWindows();
    return {
        executable: 'vim.exe',
        bin: vimDir,
    };
}
function installVimStable() {
    core.debug('Installing stable Vim on Windows');
    core.warning('No stable Vim release is officially provided for Windows. Installing nightly instead');
    return installVimNightly();
}
async function installVim(ver) {
    core.debug(`Installing Vim version '${ver}' on Windows`);
    const vimDir = await vim_1.installVimOnWindows(ver);
    return {
        executable: 'vim.exe',
        bin: vimDir,
    };
}
async function installNeovim(ver) {
    core.debug(`Installing Neovim version '${ver}' on Windows`);
    const nvimDir = await neovim_1.downloadNeovim(ver, 'windows');
    return {
        executable: 'nvim.exe',
        bin: path.join(nvimDir, 'bin'),
    };
}
function install(config) {
    if (config.neovim) {
        switch (config.version) {
            case 'stable':
                return installNeovim('stable');
            case 'nightly':
                return installNeovim('nightly');
            default:
                return installNeovim(config.version);
        }
    }
    else {
        switch (config.version) {
            case 'stable':
                return installVimStable();
            case 'nightly':
                return installVimNightly();
            default:
                return installVim(config.version);
        }
    }
}
exports.install = install;
//# sourceMappingURL=install_windows.js.map