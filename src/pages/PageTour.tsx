import { Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Map } from 'leaflet';
import { TourMap } from '@components/map-tour/Map';
import { TourLegend } from '@components/map-tour/Legend';
import 'leaflet/dist/leaflet.css';
import { PageLayout } from 'src/layout';
import { LoadingOnly } from '@components/common/Loading';

export interface MarkerData {
  title: string;
  logo?: string;
  position: [number, number];
  linkTo?: string;
}

export interface TourData {
  centerPosition: [number, number];
  zoom: number;
  markers: MarkerData[];
}

const initTourData: TourData = {
  centerPosition: [0, 0],
  zoom: 0,
  markers: []
};

const DUMMY_DATA: TourData = {
  centerPosition: [1, 1],
  zoom: 17,
  markers: [
    {
      title: 'Unit Basket Ganesha (UBG ITB)',
      position: [0.9994356098563035, 0.9998170771225912]
    },
    {
      title: 'Atletik Ganesha (ATLAS)',
      position: [0.9993283378160541, 1.0001282198031716]
    },
    {
      title: 'Unit Selam Nautika ITB',
      position: [0.9991030665201349, 0.9999780129918625]
    },
    {
      title: 'Unit Renang dan Polo Air ITB (URPA ITB)',
      position: [0.9985130701956937, 1.0002891556724027]
    },
    {
      title: 'Persatuan Sepakbola ITB (PS ITB)',
      position: [0.9990279760847098, 1.0002891556724027]
    },
    {
      title: 'Unit Bulu Tangkis ITB (UBT ITB)',
      position: [0.9995857907067599, 1.0002140522667482]
    },
    {
      title: 'Perisai Diri ITB (PD ITB)',
      position: [0.9993605194284865, 1.0004071753098656]
    },
    {
      title: 'Capoeira Brasil ITB (CBITB)',
      position: [0.9987276143259238, 1.0005251949473284]
    },
    {
      title: 'Unit Aktivitas Tenis Meja (UATM)',
      position: [0.9990279760847098, 1.0005895692950608]
    },
    {
      title: 'Unit Tenis ITB (UT ITB)',
      position: [0.9993497922243889, 1.0006968598745616]
    },
    {
      title: 'Unit Softball ITB (US ITB)',
      position: [0.9983628892962059, 1.0005466530632525]
    },
    {
      title: 'AIKIDO ITB',
      position: [0.9985667062295775, 1.0007612342222538]
    },
    {
      title: 'Glaciem Skating ITB (GSI)',
      position: [0.9988670680030705, 1.0008256085699465]
    },
    {
      title: 'Karate ITB',
      position: [0.9988670680030705, 1.0011367512505267]
    },
    {
      title: 'Unit Aktivitas Bridge (UAB)',
      position: [0.9986096150560306, 1.0010509187869099]
    },
    {
      title: 'Unit Flag Football ITB - Ganesha Touchdown (UFF-GT)',
      position: [0.9980947091014696, 1.0007183179904457]
    },
    {
      title: 'Unit Kendo ITB',
      position: [0.9979981642260186, 1.0011152931346423]
    },
    {
      title: 'Taekwondo ITB',
      position: [0.9982985260514691, 1.0011045640766802]
    },
    {
      title: 'Unit Merpati Putih',
      position: [0.9984487069538958, 1.0013727905254524]
    },
    {
      title: 'Persaudaraan Setia Hati Terate ITB (PSHT)',
      position: [0.9981268907260008, 1.001469352046991]
    },
    {
      title: 'Tarung Derajat',
      position: [0.9977728928389448, 1.001447893931107]
    },
    {
      title: 'Skor Hoki ITB',
      position: [0.9983628892962059, 1.0016624750901084]
    },
    {
      title: 'Unit Ganesha Golf ITB (UGG ITB)',
      position: [0.998062527476633, 1.001898514365034]
    },
    {
      title: 'Percama ITB',
      position: [0.9983307076739901, 1.0020487211763431]
    },
    {
      title: 'Cerberus Racing ITB',
      position: [0.998598887849465, 1.001898514365034]
    },
    {
      title: 'Unit Bola Voli (UBV)',
      position: [0.9983843437108383, 1.00244569632054]
    },
    {
      title: 'Shorinji Kempo ITB (Kempo ITB)',
      position: [0.9986417966755111, 1.0027568390011201]
    },
    {
      title: 'Ganesha Kungfu Club (GKC)',
      position: [0.9983092532590143, 1.00301433639193]
    },
    {
      title: 'Unit Panahan Pasopati ITB',
      position: [0.9981268907260008, 1.002617361247733]
    },
    {
      title: 'Lingkung Seni Sunda (LSS)',
      position: [1.0001522205014104, 0.9996271133422853]
    },
    {
      title: 'Unit Kesenian Sumatera Utara (UKSU)',
      position: [1.0004311277287867, 0.9994554519653321]
    },
    {
      title: 'Mahasiswa Bumi Sriwijaya (MUSI)',
      position: [1.0010039602069882, 0.9997236728668214]
    },
    {
      title: 'Unit Budaya Lampung (UBALA)',
      position: [1.0003925098227755, 0.9998524188995362]
    },
    {
      title: 'ITB Student Orchestra (ISO)',
      position: [1.0011584318404227, 0.9995069503804646]
    },
    {
      title: 'Keluarga Paduan Angklung (KPA)',
      position: [1.0012120678310636, 1.0002579689046343]
    },
    {
      title: 'Paduan Suara Mahasiswa (PSM)',
      position: [1.0009224334711395, 1.0002901554128132]
    },
    {
      title: 'Unit Rebana ITB (URI)',
      position: [1.000961051411819, 1.0000240802764895]
    },
    {
      title: 'Korean Culture Club ITB (KCC ITB)',
      position: [0.9999205129570251, 1.0003674030303957]
    },
    {
      title: 'Unit Kesenian Sulawesi Selatan (UKSS)',
      position: [1.0002316018079913, 1.0001957416534426]
    },
    {
      title: 'Unit Kebudayaan Irian (UKIR)',
      position: [0.9997274233105599, 1.000635623931885]
    },
    {
      title: 'Unit Kebudayaan Banten-Debust',
      position: [0.9999634217658071, 1.0007750988006594]
    },
    {
      title: 'Unit Kebudayaan Tionghoa (UKT)',
      position: [0.9998883313500634, 1.0010647773742678]
    },
    {
      title: 'ITBJazz',
      position: [1.0001136025921293, 1.00125789642334]
    },
    {
      title: 'Infinity',
      position: [1.000358182731179, 1.001107692718506]
    },
    {
      title: 'Studi Teater Mahasiswa (STEMA)',
      position: [1.0003388738187253, 1.0008180141448977]
    },
    {
      title: 'Unit Kebudayaan Jepang (UKJ)',
      position: [1.0002423290092135, 1.0005068778991701]
    },
    {
      title: 'Unit Kebudayaan Melayu Riau (UKMR)',
      position: [1.0008258886788028, 1.0005712509155276]
    },
    {
      title: 'Maha Gotra Ganesha (MGG)',
      position: [1.001061887055045, 1.000560522079468]
    },
    {
      title: 'Unit Kebudayaan Aceh',
      position: [1.0011906134349167, 1.0008287429809573]
    },
    {
      title: 'Perkumpulan Seni dan Tari Karawitan Jawa (PSTK)',
      position: [1.00093316067011, 1.000860929489136]
    },
    {
      title: 'Gajah Ngomik',
      position: [1.0011584318404227, 1.001107692718506]
    },
    {
      title: 'POCHU Genshiken ITB',
      position: [1.0008473430773417, 1.0012042522430422]
    },
    {
      title: 'Apres! ITB',
      position: [1.0010833414520317, 1.0013759136199953]
    },
    {
      title: 'Keluarga Mahasiswa Jambi (KMJ)',
      position: [1.000772252681839, 1.0015153884887698]
    },
    {
      title: 'Unit Kesenian Minangkabau ITB',
      position: [1.0009867966644403, 1.001633405685425]
    },
    {
      title: 'Loedroek',
      position: [1.000504072683839, 1.001332998275757]
    },
    {
      title: 'Pelita Muda ITB',
      position: [1.0018981994693648, 0.9972711969943183]
    },
    {
      title: 'Techno Entrepreneur Club ITB (TEC ITB)',
      position: [1.0018874722735494, 0.9975714741979004]
    },
    {
      title:
        'Keluarga Mahasiswa Pecinta Alam Ganesha Institut Teknologi Bandung (KMPA Ganesha ITB)',
      position: [1.0020912889880098, 0.9973140937377157]
    },
    {
      title: 'Kelompok Studi Ekonomi dan Pasar Modal (KSEP)',
      position: [1.0021556521583725, 0.9976143709412579]
    },
    {
      title: 'URO ITB',
      position: [1.0023234254766045, 0.9973891630385713]
    },
    {
      title: 'U-GREEN ITB',
      position: [1.0016583393560297, 0.9978717514014426]
    },
    {
      title: 'Ganesha Model United Nations (GMUN) Club',
      position: [1.001915792063879, 0.9978610272156232]
    },
    {
      title: 'Korps Sukarela PMI ITB',
      position: [1.001540340191502, 0.9981398560474863]
    },
    {
      title: 'Aksantara',
      position: [1.0016583393560297, 0.998365063950173]
    },
    {
      title: 'Pramuka ITB',
      position: [1.001336523442768, 0.9984401332510686]
    },
    {
      title: 'Otomotif Rakata ITB',
      position: [1.0008623813057598, 0.9987725830121488]
    },
    {
      title: 'Skhole',
      position: [0.9996180260050851, 0.9994911034635259]
    },
    {
      title: 'Gebrak Indonesia',
      position: [0.9995214811743782, 0.9992229988174819]
    },
    {
      title: 'Solve It',
      position: [1.00005784126811, 0.9990085151006546]
    },
    {
      title: 'KOKESMA ITB (Koperasi Kesejahteraan Mahasiswa ITB)',
      position: [1.0003260213025846, 0.9989227216139397]
    },
    {
      title: 'Student English Forum',
      position: [1.0005834741150488, 0.9989334457997592]
    },
    {
      title: 'Resimen Mahasiswa Mahawarman Batalyon I/ITB',
      position: [0.9998111156170604, 0.9993516890475941]
    },
    {
      title: 'Amateur Radio Club',
      position: [1.000218749291418, 0.9992658955608793]
    },
    {
      title: 'Keluarga Mahasiswa Islam (GAMAIS) ITB',
      position: [1.000272385338355, 1.0023759094549334]
    },
    {
      title: 'Keluarga Mahasiswa Katolik (KMK) ITB',
      position: [1.0001342189327023, 1.0020800408525956]
    },
    {
      title: 'Keluarga Mahasiswa Buddhis Dhammañano',
      position: [0.999828493673798, 1.0020639431851965]
    },
    {
      title: 'Keluarga Mahasiswa Hindu Vidya Dharma Putra Ganesha ITB (KMH)',
      position: [0.9995603135986887, 1.0019458936241101]
    },
    {
      title: 'Persekutuan Mahasiswa Kristen (PMK) ITB',
      position: [0.9997441388971708, 1.0017205262802833]
    },
    {
      title: 'Keluarga Mahasiswa Islam (Kawai) ITB Cirebon',
      position: [1.000082045769309, 1.0015810131626646]
    },
    {
      title: 'ISH Tiang Bendera',
      position: [1.0001972412413112, 0.9974352262574906]
    },
    {
      title: 'Society of Renewable Energy (SRE ITB)',
      position: [1.0004439668633416, 0.997231374156451]
    },
    {
      title: 'Majalah Ganesha',
      position: [1.0010339628407843, 0.9974352262574906]
    },
    {
      title: 'Student Chapter SPE ITB SC',
      position: [1.0011948708162186, 0.9971562707507964]
    },
    {
      title: 'Perkumpulan Studi Ilmu Kemasyarakatan ITB (PSIK ITB)',
      position: [1.0014308691658966, 0.997370851909798]
    },
    {
      title: 'Liga Film Mahasiswa ITB',
      position: [0.9982019811819849, 0.9996024959635498]
    },
    {
      title: '8EH Radio ITB',
      position: [0.9984487069538958, 0.9995595797317814]
    },
    {
      title: 'Boulevard ITB',
      position: [0.9981268907260008, 0.9999243677020921]
    },
    {
      title: 'Ganesha Interactive Media (GIM)',
      position: [0.9984057981253307, 0.9998921805282458]
    },
    {
      title: 'Radio Kampus ITB',
      position: [0.9988670680030705, 0.9992484370512013]
    },
    {
      title: 'Pers Mahasiswa ITB',
      position: [0.9992103385677251, 0.9994522891522408]
    }
  ]
};

export const Tour = () => {
  const [data, setData] = useState<TourData>(initTourData);
  const [map, setMap] = useState<Map | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setData(DUMMY_DATA);
      setIsLoading(false);
    }, 1000);
  }, [data]);

  return (
    <PageLayout title="Map Tour">
      <Heading py={6} fontSize={{ base: '4xl', lg: '6xl' }} textAlign="center">
        H ap our
      </Heading>
      {isLoading ? (
        <LoadingOnly />
      ) : (
        <>
          <TourMap data={data} setMap={setMap} />
          <TourLegend data={data} map={map} />
        </>
      )}
    </PageLayout>
  );
};
