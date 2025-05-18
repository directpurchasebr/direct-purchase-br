// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Container(props: any) {
  const customClass = props.customClass === 'start'
    ? 'justify-start'
    : props.customClass === 'column'
      ? 'flex-col justify-start'
      : props.customClass === 'min-height'
        ? 'min-h-[75%]'
        : props.customClass || '';

  return (
    <div className={`w-full max-w-7xl px-4 mx-auto flex justify-between flex-wrap ${customClass}`}>
      {props.children}
    </div>
  );
}
