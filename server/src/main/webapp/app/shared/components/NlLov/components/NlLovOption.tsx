import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React from 'react';

interface IOption {
  [key: string]: string;
}

interface INlLovProps {
  option: IOption;
  inputValue: any;
  idColumnWidth?: number;
}

const NlLovOption: React.FC<INlLovProps> = ({ inputValue, option, idColumnWidth }) => {
  const matches = match(Object.values(option)[1], inputValue);
  const parts = parse(Object.values(option)[1], matches);

  return (
    <div className="flex m-0 items-center w-full">
      <div style={{ minWidth: idColumnWidth ?? 50 }}>{Object.values(option)[0]}</div>
      <div
        className="grid w-full justify-between gap-x-1"
        style={{
          gridTemplateColumns: `${'1fr '.repeat(Math.max(1, Object.keys(option).length - 2))}
          ${Object.keys(option).length - 2 > 0 ? 'auto ' : ''}`,
        }}
      >
        {Object.entries(option)
          .splice(1)
          .map(([key, value], index) => (
            <div key={key} className="text-left truncate">
              {index === 0
                ? parts.map((part, letterIndex) => (
                    <span
                      key={letterIndex}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))
                : value}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NlLovOption;
