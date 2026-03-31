export function Axis() {
  return (
    <>
      <line x1="0" y1="100" x2="200" y2="100" stroke="white" />
      <line x1="100" y1="0" x2="100" y2="200" stroke="white" />
    </>
  );
}

export function AbsoluteGraph() {
  return (
    <svg width="200" height="200">
      <Axis />
      <polyline
        points="0,0 100,100 200,0"
        fill="none"
        stroke="cyan"
        strokeWidth="2"
      />
    </svg>
  );
}

export function LinearGraph() {
  return (
    <svg width="200" height="200">
      <Axis />
      <line x1="0" y1="200" x2="200" y2="0" stroke="cyan" strokeWidth="2" />
    </svg>
  );
}

export function ConstantGraph() {
  return (
    <svg width="200" height="200">
      <Axis />
      <line x1="0" y1="60" x2="200" y2="60" stroke="cyan" strokeWidth="2" />
    </svg>
  );
}
