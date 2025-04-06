export default function Container(props: any) {
  const customClass = props.customClass === 'start'
    ? 'justify-start'
    : props.customClass === 'column'
      ? 'flex-col justify-start'
      : props.customClass === 'min-height'
        ? 'min-h-[75%]'
        : '';

  return (
    <div className={`w-[1200px] flex justify-between mx-auto flex-wrap ${customClass}`}>
      {props.children}
    </div>
  );
}