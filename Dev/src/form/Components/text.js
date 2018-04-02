import React from 'react';

export default ({ error, ...props }) => (
    <div className="form-row">
        <label className="col-lg-1">Nombre</label>
        <input {...props} className="form-control col-lg-4" />
        
        <p className="col-lg-3 error-form">{error}</p>
    </div>
  );