export const SPACE = ' '
export const INITIAL = 'initial'

export const GENERAL_COUNTRY_CODES: Record<string, string> = {
    GB: 'English',
    ES: 'Spanish',
    FR: 'French',
    DE: 'German',
    CN: 'Chinese',
};

export const SECONDARY_COUNTRY_CODES: Record<string, string> = {
    EG: 'Arabic',
    BD: 'Bengali',
    AD: 'Catalan',
    CZ: 'Czech',
    NL: 'Dutch',
    EE: 'Estonian',
    GR: 'Greek',
    HU: 'Hungarian',
    IN: 'Hindi',
    IL: 'Hebrew',
    IS: 'Icelandic',
    IT: 'Italian',
    JP: 'Japanese',
    KE: 'Swahili',
    KR: 'Korean',
    LT: 'Lithuanian',
    LV: 'Latvian',
    MT: 'Maltese',
    MY: 'Malay',
    PH: 'Filipino',
    PL: 'Polish',
    PT: 'Portuguese',
    RO: 'Romanian',
    RU: 'Russian',
    SE: 'Swedish',
    TH: 'Thai',
    TR: 'Turkish',
    UA: 'Ukrainian',
    VN: 'Vietnamese',
};

export const COUNTRY_CODES: Record<string, string> = {
    ...GENERAL_COUNTRY_CODES,
    ...SECONDARY_COUNTRY_CODES,
};