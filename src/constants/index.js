import { Platform } from "react-native";

export const isAndroid = Platform.OS === "android" ? true : false;
export const isIos = !isAndroid;

export const APP_STATE = {
	PUBLIC: "PUBLIC_LOGIN",
	PRIVATE: "MAIN_APP",
	AUTH: "CHECKING_LOGIN",
	UNKNOWN: "UNKNOWN"
};

export const STATUS = {
	SUCCESS: "SUCCESS",
	NOT_STARTED: "NOT_STARTED",
	FETCHING: "FETCHING",
	FAILED: "FAILED"
};

export const LOCALES = {
	ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
	HINDI: { id: 2, name: "hi", label: "हिंदी" }
};

export const COUNTRIES = [
	{ label: t("countries:ca"), value: "ca" },
	{ label: t("countries:usa"), value: "usa" },
];

export const PROVINCES = [
	{ label: t("countries:ab"), value: "ab" },
	{ label: t("countries:bc"), value: "bc" },
	{ label: t("countries:mb"), value: "mb" },
	{ label: t("countries:nb"), value: "nb" },
	{ label: t("countries:nl"), value: "nl" },
	{ label: t("countries:ns"), value: "ns" },
	{ label: t("countries:nt"), value: "nt" },
	{ label: t("countries:nu"), value: "nu" },
	{ label: t("countries:on"), value: "on" },
	{ label: t("countries:pe"), value: "pe" },
	{ label: t("countries:qc"), value: "qc" },
	{ label: t("countries:sk"), value: "sk" },
	{ label: t("countries:yt"), value: "yt" },
];

export const STATES = [
	{ label: t("countries:al"), value: "al" },
	{ label: t("countries:ak"), value: "ak" },
	{ label: t("countries:az"), value: "az" },
	{ label: t("countries:ar"), value: "ar" },
	{ label: t("countries:cal"), value: "cal" },
	{ label: t("countries:co"), value: "co" },
	{ label: t("countries:ct"), value: "ct" },
	{ label: t("countries:de"), value: "de" },
	{ label: t("countries:dc"), value: "dc" },
	{ label: t("countries:fl"), value: "fl" },
	{ label: t("countries:ga"), value: "ga" },
	{ label: t("countries:hi"), value: "hi" },
	{ label: t("countries:id"), value: "id" },
	{ label: t("countries:il"), value: "il" },
	{ label: t("countries:in"), value: "in" },
	{ label: t("countries:ia"), value: "ia" },
	{ label: t("countries:ks"), value: "ks" },
	{ label: t("countries:ky"), value: "ky" },
	{ label: t("countries:ab"), value: "ab" },
	{ label: t("countries:la"), value: "la" },
	{ label: t("countries:me"), value: "me" },
	{ label: t("countries:md"), value: "md" },
	{ label: t("countries:ma"), value: "ma" },
	{ label: t("countries:mi"), value: "mi" },
	{ label: t("countries:mn"), value: "mn" },
	{ label: t("countries:ms"), value: "ms" },
	{ label: t("countries:mo"), value: "mo" },
	{ label: t("countries:mt"), value: "mt" },
	{ label: t("countries:ne"), value: "ne" },
	{ label: t("countries:nv"), value: "nv" },
	{ label: t("countries:nh"), value: "nh" },
	{ label: t("countries:nj"), value: "nj" },
	{ label: t("countries:nm"), value: "nm" },
	{ label: t("countries:ny"), value: "ny" },
	{ label: t("countries:nc"), value: "nc" },
	{ label: t("countries:nd"), value: "nd" },
	{ label: t("countries:oh"), value: "oh" },
	{ label: t("countries:ok"), value: "ok" },
	{ label: t("countries:or"), value: "or" },
	{ label: t("countries:pa"), value: "pa" },
	{ label: t("countries:ri"), value: "ri" },
	{ label: t("countries:sc"), value: "sc" },
	{ label: t("countries:sd"), value: "sd" },
	{ label: t("countries:tn"), value: "tn" },
	{ label: t("countries:tx"), value: "tx" },
	{ label: t("countries:ut"), value: "ut" },
	{ label: t("countries:vt"), value: "vt" },
	{ label: t("countries:va"), value: "va" },
	{ label: t("countries:wa"), value: "wa" },
	{ label: t("countries:wv"), value: "wv" },
	{ label: t("countries:wi"), value: "wi" },
	{ label: t("countries:wy"), value: "wy" },
	{ label: t("countries:as"), value: "as" },
	{ label: t("countries:gu"), value: "gu" },
	{ label: t("countries:mp"), value: "mp" },
	{ label: t("countries:pr"), value: "pr" },
	{ label: t("countries:vi"), value: "vi" },
	{ label: t("countries:um"), value: "um" },
	{ label: t("countries:fm"), value: "fm" },
	{ label: t("countries:mh"), value: "mh" },
	{ label: t("countries:pw"), value: "pw" },
];