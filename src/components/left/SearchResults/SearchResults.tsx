import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './SearchResults.scss';

const SearchResults = ({ isActive }: { isActive: boolean }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isActive}
      classNames="section-scaled"
      unmountOnExit
      mountOnEnter
      timeout={300}>
      <div className="section-scaled search-results" ref={nodeRef}>
        SearchResults
      </div>
    </CSSTransition>
  );
};

export default SearchResults;
