import React from 'react';

function Desc() {
  return (
    <>
      <p>
        Take a look at <span className="code">client/src/contexts/XrpContext</span>.
        This context maintains a global state and provides web3.js functionalities
        to the rest of the app.
      </p>
      <p>
        Feel free to remove any component or styling that you don't need, and
        extend <span className="code">XrpContext</span> to your dapp's needs.
      </p>
      <p>
        Happy hacking!
      </p>
    </>
  );
}

export default Desc;
