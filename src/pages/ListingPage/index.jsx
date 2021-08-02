import Table from '../../components/shared/Table';

const ListingPage = ({ url }) => {
  return (
    <div className="site-main">
      <Table url={url} />
    </div>
  );
};

export default ListingPage;
