const TRIM_TRAILING_SLASH_REGEX: RegExp = /\/+$/;

export default function trimslash(string: string) {
    return string.replace(TRIM_TRAILING_SLASH_REGEX, '');
}