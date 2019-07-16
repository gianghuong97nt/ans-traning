<div class="col-md-12 bookmark">
    <ul>
        @for($i = 1;$i<=10;$i++)
            <li>
                <a
                        @if(isset($data[$i]['prg_url']) && $data[$i]['prg_url'] !='')
                        href="{!! $data[$i]['prg_url'] !!}"
                        @endif
                >
                    <span class="bookmark_cd">{!! $i!!}</span><span class="bookmark_nm text-overfollow" maxlength="30">{!!isset($data[$i])?trim($data[$i]['prg_nm']," "):''!!}</span>
                </a>
            </li>
        @endfor
    </ul>
</div>