type MainProps = {
  children: React.ReactElement;
};

const Main = ({ children }: MainProps) => {
  return <main className="main">{children}</main>;
};

export default Main;
