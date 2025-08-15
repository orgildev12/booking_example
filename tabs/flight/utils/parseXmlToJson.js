// Жишээ нь parseXmlToJson ийг код даяар маш олон зарласан байсан.

function parseXmlToJson_1(xml) { // Яг энэ хувилбарыг ашиглаагүй хэрнээ зарлаад орхисон байсан.
    const json = {};
    for (const res of xml.matchAll(
      /(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm
    )) {
      const key = res[1] || res[3];
      const value = res[2] && parseXmlToJson_1(res[2]);
      json[key] = (value && Object.keys(value).length ? value : res[2]) || null;
    }
    return json; 
}

function parseXmlToJson_2(xml) {
    const json = {};
    for (const res of xml.matchAll(/(?:<(\w*)(?:\s[^>]*)*>)((?:(?!<\1).)*)(?:<\/\1>)|<(\w*)(?:\s*)*\/>/gm)) {
        const key = res[1] || res[3];
        const value = res[2] && parseXmlToJson_2(res[2]);
        json[key] = ((value && Object.keys(value).length) ? value : res[2]) || null;

    }
    return json;
}