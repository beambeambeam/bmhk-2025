import React from 'react';

interface MapEmbedProps {
  className?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ className }) => {
  return (
    <div className={`w-full h-full flex justify-center ${className || ''}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1036.9907655632612!2d100.49508134716899!3d13.650301798721054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a252224fdc01%3A0xdb5f69b03ef7ef07!2z4Lig4Liy4LiE4Lin4Li04LiK4Liy4Lin4Li04Lio4Lin4LiB4Lij4Lij4Lih4LiE4Lit4Lih4Lie4Li04Lin4LmA4LiV4Lit4Lij4LmMIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4nuC4o-C4sOC4iOC4reC4oeC5gOC4geC4peC5ieC4suC4mOC4meC4muC4uOC4o-C4tQ!5e0!3m2!1sth!2sth!4v1753823385431!5m2!1sth!2sth"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '20px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
