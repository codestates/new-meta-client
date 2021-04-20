/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import ChampionCard from "./ChampionCard";
import Loading from "../../../utils/Loading";

interface Props {
  Champions: string[];
}

function ChampionCardList(props: Props): ReactElement {
  const { Champions } = props;
  const [Champs, setChamps] = useState<any[]>([]);
  const [FilteredTag, setFilteredTag] = useState<any[]>([]);
  const [FilteredDiff, setFilteredDiff] = useState<any[]>([]);
  const [Query, setQuery] = useState("");
  const [FilterListT, setFilterListT] = useState<string[]>([]);
  const [FilterListD, setFilterListD] = useState<string[]>([]);
  const [Isfiltering, setIsfiltering] = useState(false);
  const diffBoxRef = useRef<HTMLDivElement>(null);
  const tagBoxRef = useRef<HTMLDivElement>(null);
  const [Load, setLoad] = useState(false);
  const [IsDiffBoxOpen, setIsDiffBoxOpen] = useState(false);
  const [IsTagBoxOpen, setIsTagBoxOpen] = useState(false);

  useEffect(() => {
    setLoad(true);
    setChamps(Champions);
    setTimeout(() => {
      setLoad(false);
    }, 1500);
  }, [Champions]);

  useEffect(() => {
    const diffBox = diffBoxRef.current;
    const tagBox = tagBoxRef.current;
    const handleClickOutsideDiff = (e: { target: any }) => {
      if (diffBox && IsDiffBoxOpen && !diffBox.contains(e.target)) {
        diffBox.style.display = "none";
        setIsDiffBoxOpen(false);
      }
    };
    const handleClickOutsideTag = (e: { target: any }) => {
      if (tagBox && IsTagBoxOpen && !tagBox.contains(e.target)) {
        tagBox.style.display = "none";
        setIsTagBoxOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutsideDiff);
    window.addEventListener("click", handleClickOutsideTag);

    return () => {
      window.removeEventListener("click", handleClickOutsideDiff);
      window.removeEventListener("click", handleClickOutsideTag);
    };
  }, [IsDiffBoxOpen, IsTagBoxOpen]);

  const showChamps = (w: string, filtered: any[]) => {
    setIsfiltering(true);
    if (w === "diff") {
      if (FilteredTag.length === 0) {
        setChamps(
          filtered.sort((a: any, b: any): number => {
            if (a.id > b.id) return 1;
            return -1;
          })
        );
      } else {
        const result = filtered.filter((el) => {
          if (FilteredTag.includes(el)) return el;
          return null;
        });
        setChamps(
          result.sort((a: any, b: any): number => {
            if (a.id > b.id) return 1;
            return -1;
          })
        );
      }
    } else if (w === "tag") {
      if (FilteredDiff.length === 0) {
        setChamps(
          filtered.sort((a: any, b: any): number => {
            if (a.id > b.id) return 1;
            return -1;
          })
        );
      } else {
        const result = filtered.filter((el) => {
          if (FilteredDiff.includes(el)) return el;
          return null;
        });
        setChamps(
          result.sort((a: any, b: any): number => {
            if (a.id > b.id) return 1;
            return -1;
          })
        );
      }
    } else {
      //
    }
  };

  const clickDiff = (start: number, end: number) => {
    const filtered = Champions.filter((el: any) => {
      const diff = el.info.difficulty;
      if (start <= diff && diff <= end) {
        return el;
      }
      return null;
    });
    if (FilteredDiff.length === 0) {
      setFilteredDiff(filtered);
      showChamps("diff", filtered);
    } else {
      const result = FilteredDiff.concat(filtered);
      setFilteredDiff(result);
      showChamps("diff", result);
    }
  };

  const clickTag = (tag: string) => {
    const filtered = Champions.filter((el: any) => {
      if (el.tags.includes(tag)) {
        return el;
      }
      return null;
    });

    if (FilteredTag.length === 0) {
      setFilteredTag(filtered);
      showChamps("tag", filtered);
    } else {
      const set = new Set(FilteredTag.concat(filtered));
      const unique = [...set];
      setFilteredTag(unique);
      showChamps("tag", unique);
    }
  };

  const clickDropdownContent = (htmlTag: any) => {
    const style: CSSStyleDeclaration | undefined = htmlTag.current?.style;
    if (style) style.display = "none";
  };

  const clickReset = () => {
    setChamps(Champions);
    setFilterListT([]);
    setFilterListD([]);
    setFilteredTag([]);
    setFilteredDiff([]);
    setIsfiltering(false);
  };

  return (
    <>
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const query = Query;
                // eslint-disable-next-line consistent-return
                const result = Champions.filter((c: any) => {
                  if (c.name.replace(" ", "").includes(query)) {
                    return c;
                  }
                });
                setChamps(result);
              }
            }}
          ></input>
          <i
            onClick={() => {
              const query = Query;
              // eslint-disable-next-line consistent-return
              const result = Champions.filter((c: any) => {
                if (c.name.replace(" ", "").includes(query)) {
                  return c;
                }
              });
              setChamps(result);
            }}
            aria-hidden="true"
            className="icon-search"
          ></i>
        </div>
        <div className="dropdown">
          <div
            onClick={() => {
              const style: CSSStyleDeclaration | undefined =
                tagBoxRef.current?.style;
              if (style && !IsTagBoxOpen) {
                style.display = "block";
                setIsTagBoxOpen(true);
              }
            }}
            aria-hidden="true"
            className="tags"
          >
            Tags
          </div>
          <div ref={tagBoxRef} className="dropdown-contents">
            <div
              onClick={() => {
                if (!FilterListT.includes("Fighter")) {
                  clickTag("Fighter");
                  clickDropdownContent(tagBoxRef);
                  FilterListT.push("Fighter");
                }
              }}
              aria-hidden="true"
            >
              Fighter
            </div>
            <div
              onClick={() => {
                if (!FilterListT.includes("Tank")) {
                  clickTag("Tank");
                  clickDropdownContent(tagBoxRef);
                  FilterListT.push("Tank");
                }
              }}
              aria-hidden="true"
            >
              Tank
            </div>
            <div
              onClick={() => {
                if (!FilterListT.includes("Mage")) {
                  clickTag("Mage");
                  clickDropdownContent(tagBoxRef);
                  FilterListT.push("Mage");
                }
              }}
              aria-hidden="true"
            >
              Mage
            </div>
            <div
              onClick={() => {
                if (!FilterListT.includes("Assassin")) {
                  clickTag("Assassin");
                  clickDropdownContent(tagBoxRef);
                  FilterListT.push("Assassin");
                }
              }}
              aria-hidden="true"
            >
              Assassin
            </div>
            <div
              onClick={() => {
                if (!FilterListT.includes("Support")) {
                  clickTag("Support");
                  clickDropdownContent(tagBoxRef);
                  FilterListT.push("Support");
                }
              }}
              aria-hidden="true"
            >
              Support
            </div>
            <div
              onClick={() => {
                if (!FilterListT.includes("Marksman")) {
                  clickTag("Marksman");
                  clickDropdownContent(tagBoxRef);
                  FilterListT.push("Marksman");
                }
              }}
              aria-hidden="true"
            >
              Marksman
            </div>
          </div>
        </div>
        <div className="dropdown">
          <div
            onClick={() => {
              const style: CSSStyleDeclaration | undefined =
                diffBoxRef.current?.style;
              if (style && !IsDiffBoxOpen) {
                style.display = "block";
                setIsDiffBoxOpen(true);
              }
            }}
            aria-hidden="true"
            className="difficulty"
          >
            Difficulty
          </div>
          <div ref={diffBoxRef} className="dropdown-contents">
            <div
              onClick={() => {
                if (!FilterListD.includes("Hard")) {
                  clickDiff(8, 10);
                  clickDropdownContent(diffBoxRef);
                  FilterListD.push("Hard");
                  setFilterListD(FilterListD);
                }
              }}
              aria-hidden="true"
            >
              Hard
            </div>
            <div
              onClick={() => {
                if (!FilterListD.includes("Normal")) {
                  clickDiff(4, 7);
                  clickDropdownContent(diffBoxRef);
                  FilterListD.push("Normal");
                  setFilterListD(FilterListD);
                }
              }}
              aria-hidden="true"
            >
              Normal
            </div>
            <div
              onClick={() => {
                if (!FilterListD.includes("Easy")) {
                  clickDiff(0, 3);
                  clickDropdownContent(diffBoxRef);
                  FilterListD.push("Easy");
                  setFilterListD(FilterListD);
                }
              }}
              aria-hidden="true"
            >
              Easy
            </div>
          </div>
        </div>
        <div onClick={clickReset} aria-hidden="true" className="reset-btn">
          [ Reset Filter ]
        </div>
      </div>
      {/* {FilterList.length > 0 && <div className="filter-list">Filtered :</div>} */}
      <div className="filter-list">
        {Isfiltering && <div className="prefix">Filtered : </div>}
        {FilterListT.length > 0 && (
          <div className="filter-items-T">
            {FilterListT.map((el, idx) => {
              return <div key={idx}>{el}</div>;
            })}
          </div>
        )}
        {FilterListD.length > 0 && (
          <div className="filter-items-D">
            {FilterListD.map((el, idx) => {
              return <div key={idx}>{el}</div>;
            })}
          </div>
        )}
      </div>
      <div className="champions">
        {Champs.map((el, idx) => {
          return <ChampionCard key={idx} data={el} />;
        })}
        {Load ? <Loading /> : null}
      </div>
    </>
  );
}

export default ChampionCardList;
