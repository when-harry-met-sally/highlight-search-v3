import React, { useState } from "react";
import { elastic } from "../helpers/elastic";
import { people } from "../data/people";

const Main: React.FC = () => {
  console.log(people);

  const [filter, setFilter] = useState();

  const handleApplyFilter = (e: any) => {
    setFilter(e.target.value);
  };

  const criterias = [
    ["name"],
    ["occupation"],
    ["address", "street"],
    ["address", "state"],
    ["address", "details", "yearDestroyed"]
  ];

  const filtered = elastic(filter, people, criterias);

  return (
    <div>
      <h2>Nested Object Explorer</h2>
      <div>
        Filter: <input onChange={e => handleApplyFilter(e)} />{" "}
        <span>({filtered.length}) Results</span>
      </div>

      <br />
      <div>
        <hr />
        <strong>Fields to Search ({criterias.length})</strong>
        {criterias.map(criteria => (
          <div>
            {criteria.map((field, i) => (
              <span>
                {field} {i === criteria.length - 1 ? null : "---> "}
              </span>
            ))}
          </div>
        ))}
      </div>
      <hr />
      <br />

      {filtered.map((person, i) => {
        return (
          <div key={i}>
            <div>
              {i === 0 ? "const people = [" : null}
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
                <div>&emsp; &emsp; &emsp;&emsp; }</div>
              </div>
            </div>
            <span>{i === filtered.length - 1 ? "}]" : "},"}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Main;
