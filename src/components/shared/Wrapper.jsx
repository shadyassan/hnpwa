import TopBar from '../shared/Topbar';

const Wrapper = ({ children }) => {
  return (
    <div className="container">
      <TopBar />
      {children}
    </div>
  );
};

export default Wrapper;
