import React from "react";
import VerticalBar from "../components/VerticalBar";
import { getCompanyAvarege } from "../api/api";
import {Chart as ChartJS} from "chart.js/auto";
import Loading from "../components/helper/Loading";

ChartJS.defaults.font.size = 20

const CompanyAvarege = () => {
  const colors = {
    0: "#484F8C",
    1: "#7C89F2",
  };

  const user = {
    0: ["Usuário", "user_review"],
    1: ["Critica", "meta_score"],
  };

  const [useData, setUserData] = React.useState(null);

  React.useEffect(() => {
    async function avarege() {
      const { url, options } = getCompanyAvarege();
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok)
        setUserData({
          labels: json.map((comp) => comp.name),
          datasets: [
            {
              label: "Usuário",
              data: json.map((comp) =>
                (
                  comp.games.reduce((a, b) => a + b.user_review, 0) /
                  comp.games.length
                ).toFixed(1)
              ),
              backgroundColor: colors[1],
            },
            {
              label: "Critica",
              data: json.map((comp) =>
                (
                  comp.games.reduce((a, b) => a + b.meta_score, 0) /
                  comp.games.length /
                  10
                ).toFixed(1)
              ),
              backgroundColor: colors[0],
            },
          ], 
        });
    }
    avarege();
  }, []);


  return (
    <div style={{ width: "1000px"}}>
      {!useData && <Loading />}
      {useData && <VerticalBar charData={useData} options={useData.options} />}
    </div>
  );
};

export default CompanyAvarege;
