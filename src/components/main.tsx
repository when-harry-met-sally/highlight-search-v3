import React, { useState } from "react";
import { elastic } from "../helpers/elastic";
import { people } from "../data/people";

const Main: React.FC = () => {
  const [filter, setFilter] = useState();

  const handleApplyFilter = (e: any) => {
    setFilter(e.target.value);
  };

  console.log(people);

  let filtered = elastic(filter, people, [
    ["name"],
    ["address", "street"],
    ["address", "state"],
    ["address", "details", "yearDestroyed"]
  ]);

  return (
    <div>
      <div>
        Filter: <input onChange={e => handleApplyFilter(e)} />
      </div>
      <div>({filtered.length}) Results</div>
      {filtered.map((person, i) => {
        return (
          <div key={i}>
            <br />
            <div>
              {i === 0 ? "const people = " : null}
              {"{"}
            </div>
            <div>
              {" "}
              &emsp; <strong>name:</strong> {person.name},
            </div>
            <div>
              {" "}
              &emsp; <strong>occupation:</strong> {person.occupation},
            </div>
            <div>
              {" "}
              &emsp; <strong>address:</strong> {"{"}
            </div>
            <div>
              {" "}
              &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; <strong>
                street:
              </strong>{" "}
              {person.address.street},{" "}
            </div>
            <div>
              {" "}
              &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; <strong>
                city:
              </strong>{" "}
              {person.address.city},{" "}
            </div>
            <div>
              {" "}
              &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; <strong>
                state:
              </strong>{" "}
              {person.address.state},{" "}
              <div>
                &emsp; &emsp; &emsp; &emsp; &emsp;&emsp;{" "}
                <strong>details: </strong>
                {"{"}
                <div>
                  &emsp; &emsp; &emsp; &emsp;&emsp;&emsp; &emsp; &emsp; &emsp;
                  &emsp;&emsp;
                  <strong>yearBuilt: </strong>{" "}
                  {person.address.details.yearBuilt},
                </div>
                <div>
                  &emsp; &emsp; &emsp; &emsp;&emsp;&emsp; &emsp; &emsp; &emsp;
                  &emsp;&emsp;
                  <strong>yearDestroyed: </strong>{" "}
                  {person.address.details.yearDestroyed},
                </div>
                <div>
                  &emsp; &emsp; &emsp; &emsp;&emsp;&emsp; &emsp; &emsp; &emsp; }
                </div>
              </div>
            </div>
            <div>{"},"}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
