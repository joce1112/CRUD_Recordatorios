import AppBar from '../../components/AppBar';
import React from "react";
import us from "../../../src/assets/images/us.png";
import mx from "../../../src/assets/images/mx.png";
import "../../App.css";
import { useTranslation } from "react-i18next";
import { Button } from '@mui/material';


export default function Home() {

const { i18n, t } = useTranslation();
  const changeLaguage = (language) => {
    i18n.changeLanguage(language);
  };
    return (        
        <div className="form-widget">  
        
        <AppBar/>  
        <div className="App">
      <header className="App-header">
        <img
          src={i18n.language === "es" ? mx : us}
          className="flags"
          alt="mxlogo"
        />
        <p>{t("welcome")}</p>
        <p>{t("thanks")}</p>
        <p>{t("select")}</p>
        <div className="link-container">
          <Button
            className={`App-link ${
              i18n.language === "es" ? "selected" : "unselected"
            }`}
            onClick={() => changeLaguage("es")}
          >
            MX
          </Button>
          <Button
            className={`App-link ${
              i18n.language === "en" ? "selected" : "unselected"
            }`}
            onClick={() => changeLaguage("en")}
          >
            US
          </Button>
          
        </div>
      
      </header>
    </div>
        </div>
    );
}
