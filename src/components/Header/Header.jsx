import { Fragment, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
const Header = () => {
  const [destination, setDestination] = useState('');
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const optionsChangeHandler = (type, operation) => {
    setOptions((pre) => ({
      ...pre,
      [type]: operation === 'inc' ? +options[type] + 1 : +options[type] - 1,
    }));
  };
  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown">2023/06/23</div>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions((pre) => !pre)}
          >
            {Object.keys(options).map((op, index) => (
              <Fragment key={index}>
                {op} : {options[op]}
                {Object.keys(options).length !== index + 1 && <>&bull;</>}
              </Fragment>
            ))}
            {/* 1 adult &bull; children &bull; 1 room */}
          </div>
          {openOptions && (
            <GuestOptionList
              handleOptions={optionsChangeHandler}
              options={options}
            />
          )}

          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn">
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

function GuestOptionList({ options, handleOptions }) {
  return (
    <div className="guestOptions">
      {/* <OptionItem type /> */}
      {Object.keys(options).map((op, index) => (
        <OptionItem
          key={index}
          handleOptions={handleOptions}
          type={op}
          options={options}
        />
      ))}
    </div>
  );
}

function OptionItem({ type, options, handleOptions }) {
  const minLimitHandler = () => {
    switch (type) {
      case 'adult':
        return 1;
      case 'children':
        return 0;
      case 'room':
        return 1;
    }
  };
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          disabled={options[type] === minLimitHandler()}
          className="optionCounterBtn"
          onClick={() => handleOptions(type, 'dec')}
        >
          <HiMinus />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, 'inc')}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
