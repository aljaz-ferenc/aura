interface ChordDisplayProps {
  symbol: string;
  rootNote?: string;
  className?: string;
}

export function ChordDisplay({
  symbol,
  rootNote,
  className,
}: ChordDisplayProps) {
  const renderChord = () => {
    const baseClass = "bravura-text";

    switch (symbol) {
      case "maj":
        return rootNote ? (
          <span className={baseClass}></span>
        ) : (
          <span className={"bravura-text"}>Maj</span>
        );

      case "maj7":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>Maj7</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>7</SmallText>
          </span>
        );

      case "maj9":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>Maj9</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>9</SmallText>
          </span>
        );

      case "maj13":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>Maj13</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>13</SmallText>
          </span>
        );

      case "maj7#11":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>Maj7{"\uED62"}11</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>7{"\uED62"}11</SmallText>
          </span>
        );

      case "maj7#5":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>Maj7{"\uED62"}5</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>7{"\uED62"}5</SmallText>
          </span>
        );

      case "min":
        return rootNote ? (
          <span className={baseClass}>m</span>
        ) : (
          <span className={baseClass}>min</span>
        );

      case "min7":
        return rootNote ? (
          <span className={baseClass}>
            m<SmallText>7</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            min<SmallText>7</SmallText>
          </span>
        );

      case "minmaj7":
        return rootNote ? (
          <span className={baseClass}>
            m<SmallText>Maj7</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            min<SmallText>Maj7</SmallText>
          </span>
        );

      case "min9":
        return rootNote ? (
          <span className={baseClass}>
            m<SmallText>9</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            min<SmallText>9</SmallText>
          </span>
        );

      case "min7b5":
        return rootNote ? (
          <span className={baseClass}>
            m<SmallText>7{"\uED60"}5</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Min<SmallText>7{"\uED60"}5</SmallText>
          </span>
        );

      case "7":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>7</SmallText>
          </span>
        ) : (
          <span>7</span>
        );
      case "9":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>9</SmallText>
          </span>
        ) : (
          <span>9</span>
        );

      case "7sus4":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>7sus4</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            7<SmallText>sus</SmallText>
            <SmallText>4</SmallText>
          </span>
        );

      case "7b9":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>7{"\uED60"}9</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            7<SmallText>{"\uED60"}9</SmallText>
          </span>
        );

      case "7#9":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>7{"\uED62"}9</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            7<SmallText>{"\uED62"}9</SmallText>
          </span>
        );

      case "7#11":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>7{"\uED62"}11</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            7<SmallText>{"\uED62"}11</SmallText>
          </span>
        );

      case "7alt":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>7alt</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            7<SmallText>alt</SmallText>
          </span>
        );

      case "dim":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>{"\uE870"}</SmallText>
          </span>
        ) : (
          <span className={baseClass}>dim</span>
        );

      case "dim7":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>{"\uE870"}7</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            dim<SmallText>7</SmallText>
          </span>
        );

      case "aug":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>{"\uE872"}</SmallText>
          </span>
        ) : (
          <span className={baseClass}>aug</span>
        );

      case "add9":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>add9</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Add<SmallText>9</SmallText>
          </span>
        );

      case "6":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>6</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>6</SmallText>
          </span>
        );

      case "6/9":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>6{"\uE87B"}9</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            Maj<SmallText>6{"\uE87B"}9</SmallText>
          </span>
        );

      case "sus2":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>sus2</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            sus<SmallText>2</SmallText>
          </span>
        );

      case "sus4":
        return rootNote ? (
          <span className={baseClass}>
            <SmallText>sus4</SmallText>
          </span>
        ) : (
          <span className={baseClass}>
            sus<SmallText>4</SmallText>
          </span>
        );

      default:
        return <span className={baseClass}>{symbol}</span>;
    }
  };

  return (
    <span className={className}>
      {rootNote && <span className="bravura-font">{rootNote}</span>}
      {renderChord()}
    </span>
  );
}

function SmallText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bravura-font"
      style={{
        fontSize: "0.8em",
        verticalAlign: "super",
        lineHeight: "1",
      }}
    >
      {children}
    </span>
  );
}
