export default function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.handleOption}
      className={`m-${props.margin}
      bg-${props.background}
      text-${props.color}
      width-${props.width}
      height-${props.height}
      border-${props.border}
      borderR={props.borderR}
      position={props.position}
      top={props.top}
      right={props.right}
      bottom={props.bottom}
      left={props.left}`}
    >
      {props.text}
    </button>
  );
}
