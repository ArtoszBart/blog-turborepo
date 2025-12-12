import {
  IClientPaginator,
  IPaginator,
} from '@/lib/pagination/types/IPaginator';
import ClientPaginator from './components/ClientPaginator';
import ServerPaginator from './components/ServerPaginator';
import './paginator.scss';

export default function Paginator(props: IPaginator | IClientPaginator) {
  return (
    <div className='paginator'>
      {'setPage' in props ? (
        <ClientPaginator {...props} />
      ) : (
        <ServerPaginator {...props} />
      )}
    </div>
  );
}
