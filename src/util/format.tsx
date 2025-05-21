/* eslint-disable react/no-danger */
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TextColorProps {
  children?: React.ReactNode;
}
const textColor = (props: TextColorProps | any) => {
  let content = props.children ? props.children[0] : '';
  content = typeof content === 'string' && content.replace('(frame)', '');
  content = typeof content === 'string' && content.replace('(frame-2)', '');
  content = typeof content === 'string' && content.replace('(frame-3)', '');
  content = typeof content === 'string' && content.replace('(frame-4)', '');
  content = typeof content === 'string' && content.replace('(center)', '');
  content = typeof content === 'string' && content.replace('(right)', '');
  const regExp = /\(([^)]+)\)/;
  const condition = regExp.exec(content);
  const getClass = condition !== null ? `${condition[1]}` : '#FFCC4D';
  const text = condition !== null ? content.replace(`(${condition[1]})`, '') : props.children;
  return {
    getClass,
    text,
    condition,
  };
};

const TextFrame = ({ children, data }:any) => {
  const content = data.children ? data.children[0] : '';
  let condition = null;
  if (content.includes('(frame)')) {
    condition = 'frame';
  } else if (content.includes('(frame-2)')) {
    condition = 'frame-2';
  } else if (content.includes('(frame-3)')) {
    condition = 'frame-3';
  } else if (content.includes('(frame-4)')) {
    condition = 'frame-4';
  }

  const alignCenter = content.includes('(center)');
  const alignRight = content.includes('(right)');
  let alignment = 'text-left';
  if (alignCenter) {
    alignment = 'text-center';
  } else if (alignRight) {
    alignment = 'text-right';
  }

  switch (condition) {
    case 'frame':
      return (
        <div className='pr-2 pb-2 relative'>
          <div className='bg-blog px-3 py-1 rounded-lg relative z-10'>
            <div className={`clear-both ${alignment}`}>{children}</div>
          </div>
          <div className='absolute bottom-0 w-full h-full pl-2 pt-2'>
            <div className='w-full h-full bg-gradient-to-t from-golden-2 to-golden-1 rounded-lg' />
          </div>
        </div>
      );
    case 'frame-2':
      return (
        <div className='relative'>
          <div className='px-10 md:px-20 py-1 rounded-lg relative z-10'>
            <div className={`clear-both ${alignment}`}>{children}</div>
          </div>
          <div className='absolute bottom-0 w-full h-full'>
            <div className='absolute -top-2 left-5'>
              <Image src='/assets/main/svg/quote.svg' alt='qoute' width={20} height={20} />
            </div>
            <div className='w-full h-full bg-gray-200 rounded-lg' />
            <div className='absolute -bottom-4 right-5'>
              <Image
                src='/assets/main/svg/quote.svg'
                alt='qoute'
                width={20}
                height={20}
                className='rotate-180'
              />
            </div>
          </div>
        </div>
      );
    case 'frame-3':
      return (
        <div className='relative'>
          <div className='relative w-[150px] mx-auto'>
            <Image
              src='/assets/blog/three-star.svg'
              alt='three-star'
              layout='responsive'
              width={84}
              height={33}
            />
          </div>
          <div className='relative w-full h-full py-4'>
            <div className='absolute top-1/2 left-0 transform -translate-y-1/2 w-full'>
              <div className='relative'>
                <Image
                  src='/assets/blog/golden-border.svg'
                  alt='golden-border'
                  layout='responsive'
                  width={953}
                  height={8}
                />
              </div>
            </div>
            <div className='relative flex justify-center'>
              <div className='clear-both text-center bg-blog px-3'>
                <div className='text-gradient-2'>{children}</div>
              </div>
            </div>
          </div>
          <div className='relative'>
            <Image
              src='/assets/blog/golden-border.svg'
              alt='golden-border'
              layout='responsive'
              width={953}
              height={8}
            />
          </div>
        </div>
      );
    case 'frame-4':
      return (
        <div className='relative'>
          <div className='relative w-[60px] mx-auto mb-3'>
            <Image src='/assets/blog/strapi/quote.svg' alt='qoute' width={47} height={40} />
          </div>
          <div>
            <div className={`clear-both ${alignment} text-center`}>{children}</div>
          </div>
        </div>
      );
    default:
      return children;
  }
};

export const RichTextMarkdown = ({ content }:any) => {
  return (
    <ReactMarkdown
      components={{
       
        blockquote: ({ node, ...props }) => {
          return (
            <div className='bg-quote px-5 py-2 w-full rounded-lg whitespace-pre-line'>
              {props.children}
            </div>
          );
        },
        br: () => {
          return <br/>;
        },
        em: ({ node, ...props }) => {
          const { getClass, text, condition } = textColor(props);
          return condition === null ? (
            <i>{text}</i>
          ) : (
            <span style={{ color: getClass }}>{text}</span>
          );
        },
        strong: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <strong style={{ color: getClass }} className='font-bolded'>
              {text}
            </strong>
          );
        },
        h1: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h1 id={text} style={{ color: getClass }}>
                {text}
              </h1>
            </TextFrame>
          );
        },
        h2: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h2 id={text} style={{ color: getClass }}>
                {text}
              </h2>
            </TextFrame>
          );
        },
        h3: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h3 id={text} style={{ color: getClass }}>
                {text}
              </h3>
            </TextFrame>
          );
        },
        h4: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h4 id={text} style={{ color: getClass }}>
                {text}
              </h4>
            </TextFrame>
          );
        },
        h5: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <h5 id={text} style={{ color: getClass }}>
                {text}
              </h5>
            </TextFrame>
          );
        },

        h6: ({ node, ...props }) => {
          const { getClass, text } = textColor(props);
          return (
            <TextFrame data={props}>
              <div className='text-center text-amber-400 py-[10px]'>
                 <h6 id={text} style={{ color: getClass }}>
                {text}
              </h6>
              </div>
             
            </TextFrame>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
