const Loading = () => {

  return <>
    { !fileContent && <div className='dropOverlay absolute bg-gray-500 w-96 h-96 flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <h1>Hello</h1>
        </div>}
  </>
};

export default Loading;
