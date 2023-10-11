import { FixedSizeList } from 'react-window';

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;
  const itemSize = 36; // or adjust to your item's height

  return (
    <div ref={ref}>
      <FixedSizeList
        height={250}
        width={300}
        itemSize={itemSize}
        itemCount={itemCount}
        itemData={itemData}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + 8,
    },
  });
}
