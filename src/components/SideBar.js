import React from 'react';

const SideBar = ({all, products, setFilter}) => {

  function sortCandy(stock, type) {
    const ans = [];
    const main = stock.filter(s => s.categories.find(c => c.id === type))
    main.map(m => m.categories.forEach(c => {
      if (c.id !== type) ans.push(`${c.category_name}_${c.id}`);
    }))
    const ans2 = [];
    for (let i = 0; i < ans.length; i++) {
      ans2.forEach(a => {
        if (a[0] === ans[i]) a.push(ans[i]);
      });
      if (ans2.filter(a => a[0] === ans[i])[0] === undefined) ans2.push([ans[i]]);
    }
    return ans2;
  }

  const fetchThisCategory = (id) => {
    const filterCandy = all.filter(p => p.categories.find(pc => pc.id === Number(id)))
    setFilter(filterCandy)
  };

  return (
    <div className="side-outline">
      <div className="main-category">
        <strong onClick={() => setFilter(all)}>ALL</strong>
      </div>
      <hr />
      <div className="main-category">
        <strong onClick={() => fetchThisCategory(1)}>CANDY</strong>
      </div>
      <hr />
      <ul>
        {products[0] &&
          sortCandy(products, 1).map(tag => {
            return (
                <li key={tag[0]} onClick={() => fetchThisCategory(tag[0].split('_')[1])}>
                  {tag[0].split('_')[0].toUpperCase()}
                  {tag.length > 1 ? ` (${tag.length})` : ''}
                </li>
            );
          })}
      </ul>
      <div className="main-category">
        <strong onClick={() => fetchThisCategory(2)}>GUMMY</strong>
      </div>
      <hr />
      <ul>
        {products[0] &&
          sortCandy(products, 2).map(tag => {
            return (
              <li key={tag[0]} onClick={() => fetchThisCategory(tag[0].split('_')[1])}>
                {tag[0].split('_')[0].toUpperCase()}
                {tag.length > 1 ? ` (${tag.length})` : ''}
              </li>
            );
          })}
      </ul>
      <div className="main-category">
        <strong onClick={() => fetchThisCategory(3)}>CHOCOLATE</strong>
      </div>
      <hr />
      <ul>
        {products[0] &&
          sortCandy(products, 3).map(tag => {
            return (
              <li key={tag[0]} onClick={() => fetchThisCategory(tag[0].split('_')[1])}>
                {tag[0].split('_')[0].toUpperCase()}
                {tag.length > 1 ? ` (${tag.length})` : ''}
              </li>
            );
          })}
      </ul>
      <div className="main-category">
        <strong onClick={() => fetchThisCategory(4)}>COLLECTON</strong>
      </div>
      <hr />
      <ul>
        {products[0] &&
          sortCandy(products, 4).map(tag => {
            return (
              <li key={tag[0]} onClick={() => fetchThisCategory(tag[0].split('_')[1])}>
                {tag[0].split('_')[0].toUpperCase()}
                {tag.length > 1 ? ` (${tag.length})` : ''}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SideBar