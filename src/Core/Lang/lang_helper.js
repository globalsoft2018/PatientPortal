import React from "react";
import i18n from "i18next";
import ar from "../../assets/Dic/ar.json";
import en from "../../assets/Dic/en.json";
import {  initReactI18next } from "react-i18next";

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: en
            },
            ar:{
                translation: ar
            }
        },
        lng: localStorage.getItem("lang")??"en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });
export  default  i18n;