import React from 'react';

const SideBar = ({all, products, setFilter}) => {

  function sortCandy(stock, type) {
    let ans = [];
    for (let i = 0; i < stock.length; i++) {
      for (let j = 0; j < stock[i].categories.length; j++) {
        if (stock[i].categories[j].id === type) {
          stock[i].categories.map(c => {
            if (c.id !== type) ans.push(`${c.category_name}_${c.id}`);
            return c
          });
        }
      }
    }
    let ans2 = [];
    for (let i = 0; i < ans.length; i++) {
      ans2.map(a => {
        if (a[0] === ans[i]) a.push(ans[i]);
        return a
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